def main():
    print("Let's custom your environment")
    print("------------------------------------------------------")
    getMongoKey()
    print("------------------------------------------------------")
    getKeyMetriks()
    print("------------------------------------------------------")
    changeHost()


def getMongoKey():
    mongoSecert = str(input("Please, input new mongo secret key: "))
    if len(mongoSecert) > 0:
        mongoEnv = "\t  - SECRET=" + mongoSecert + "\n"
        listType = list()
        with open("docker-compose.yml", "r") as fileRead:
            for string in fileRead:
                if "SECRET=" in string:
                    listType.append(mongoEnv)
                else:
                    listType.append(string)
        with open("docker-compose.yml", "w") as fileWrite:
            fileWrite.writelines(listType)
        print("Your mongo secret key was successfully changed.\n"
              "If you want, you may check the docker-compose.yml file")
    else:
        raise Exception("Please, input not empty value")


def getKeyMetriks():
    answer = str(input("Do you want use a keymetriks? y/N: ") or "n")
    if answer.lower() == "y":
        public = str("\"" + input("Please, input public key: ") + "\"")
        private = str("\"" + input("Please, input private key: ") + "\"")
        if len(public) > 0 and len(private) > 0:
            dockerRunContainerCommand = "CMD [ \"pm2-runtime\",\"--public\"," + \
                                        public + ", \"--secret\"," + private + " ,\"--json\",\"pm2.json\" ]"
            with open("Dockerfile", "r") as testFile:
                dockerFileStrings = testFile.readlines()
                dockerFileStrings[-1] = dockerRunContainerCommand
            with open("Dockerfile", "w") as fileWrite:
                fileWrite.writelines(dockerFileStrings)
            print("You docker container will start with keymetriks")
        else:
            raise Exception("Please, input not empty value")
    else:
        print("Your docker container will start without keymetriks")
        with open("Dockerfile", "r") as testFile:
            dockerFileStrings = testFile.readlines()
            dockerFileStrings[-1] = "CMD [ \"pm2-runtime\",\"--json\",\"pm2.json\" ]"
        with open("Dockerfile", "w") as fileWrite:
            fileWrite.writelines(dockerFileStrings)


def changeHost():
    print("Lets change your host for socket")
    host = "127.0.0.1"
    answer = str(input("Do you use localhost or 127.0.0.1 host? Y/n: ") or "y")
    if answer.lower() == 'n':
        host = str(input("Please, input your host: "))

    listType = list()
    with open("src/client/components/Chat/Chat.jsx", "r") as fileRead:
        for string in fileRead:
            if "socketIOClient(" in string:
                listType.append("const socket = socketIOClient(\"http://" + host + ":5050\");\n")
            else:
                listType.append(string)
    with open("src/client/components/Chat/Chat.jsx", "w") as fileWrite:
        fileWrite.writelines(listType)
    print("Your socket will take to " + host + " host")


main()
