# Student
id: @string @primary_key
email: @string @unique
password: @string
name: @string
college: @string
course: @string
cpf: @string @unique
registration: @string @unique
valid_until: @datetime
use_code: @string @unique
picture_file: @string
created_at: @datetime
updated_at: @datetime
deleted_at: @datetime
