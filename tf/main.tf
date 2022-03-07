resource "aws_s3_bucket" "ariano" {
  bucket = var.domain_name
}