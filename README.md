# The Guardian Project

An Open Source Software (OSS) Security Inspector made with ❤️ by 
- [@imraunn](https://github.com/imraunn)
- [@artiyadav28](https://github.com/artiyadav28)
- [@himanshudas75](https://github.com/himanshudas75)

Live Instance: [theguardianproject.ml](http://theguardianproject.ml)

## Features
- **TRUST SCORE** 
    EDF probability distribution applied on data scraped from GIT API to generate an estimate trust score of a repository.
- **GIT** 
    Recursively walk and analyze dependencies of a GIT repository to check for vulnerabilities and outdated dependencies.
- **PYPI** 
    Interact with PyPI API to fetch dependencies of a package and analyze for CVEs.
- **NPM** 
    Interact with NPM API to fetch dependencies of a package and identify vulnerabilities and outdated dependencies.
- **SENSITIVE INFO** 
    Identify hardcoded secrets, tokens, passwords, emails from a repository.
