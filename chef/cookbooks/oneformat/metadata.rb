name             "tio-patinhas"
maintainer       "JusBrasil"
maintainer_email "dev@jusbrasil.com.br"
license          "Proprietary"
description      "Configure tio-patinhas project"

version (ENV['VERSION'] or "1.0.0")

depends "nodejs"
depends "git"
depends "s3_file"
depends "newrelic_monitoring"
