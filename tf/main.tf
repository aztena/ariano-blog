resource "aws_s3_bucket" "blog" {
  bucket = var.domain_name
}

resource "aws_acm_certificate" "blog" {
  domain_name       = var.domain_name
  validation_method = "DNS"
}

data "aws_route53_zone" "blog" {
  name         = var.domain_name
  private_zone = false
}

resource "aws_route53_record" "blog" {
  for_each = {
    for dvo in aws_acm_certificate.blog.domain_validation_options : dvo.domain_name => {
      name   = dvo.resource_record_name
      record = dvo.resource_record_value
      type   = dvo.resource_record_type
    }
  }

  allow_overwrite = true
  name            = each.value.name
  records         = [each.value.record]
  ttl             = 60
  type            = each.value.type
  zone_id         = data.aws_route53_zone.blog.zone_id
}

resource "aws_acm_certificate_validation" "blog" {
  certificate_arn         = aws_acm_certificate.blog.arn
  validation_record_fqdns = [for record in aws_route53_record.blog : record.fqdn]
}

locals {
  s3_origin_id = var.cloudfront_s3_origin_name
}

resource "aws_cloudfront_origin_access_identity" "s3_blog" {
  comment = "Origin access identity for blog S3 bucket"
}

resource "aws_cloudfront_distribution" "s3_blog" {
  origin {
    domain_name = aws_s3_bucket.blog.bucket_regional_domain_name
    origin_id   = locals.s3_origin_id

    s3_origin_config {
      origin_access_identity = aws_cloudfront_origin_access_identity.s3_blog.cloudfront_access_identity_path
    }
  }

  enabled             = true
  is_ipv6_enabled     = true
  default_root_object = "index.html"

#   logging_config {
#     include_cookies = false
#     bucket          = "mylogs.s3.amazonaws.com"
#     prefix          = "myprefix"
#   }

  aliases = [var.domain_name]

  default_cache_behavior {
    allowed_methods  = ["GET", "HEAD"]
    cached_methods   = ["GET", "HEAD"]
    target_origin_id = local.s3_origin_id

    forwarded_values {
      query_string = false

      cookies {
        forward = "none"
      }
    }

    min_ttl                = 0
    default_ttl            = 3600
    max_ttl                = 86400
    compress               = true
    viewer_protocol_policy = "redirect-to-https"
  }

  
  price_class = "PriceClass_200"

  restrictions {
    geo_restriction {
      restriction_type = "whitelist"
      locations        = ["US", "CA", "GB", "DE"]
    }
  }

  tags = {
    Environment = "production"
  }

  viewer_certificate {
    acm_certificate_arn = aws_acm_certificate.blog.arn
  }
}