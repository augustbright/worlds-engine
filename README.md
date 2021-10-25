### start
```bash
# docker
$ docker build -f Dockerfile.dev -t worlds-engine .
$ docker run -d -p 8080:8080 --env-file=.env -v $(pwd)/src:/code/src worlds-engine
```