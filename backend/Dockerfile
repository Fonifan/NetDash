FROM gradle:jdk11-hotspot AS build
COPY --chown=gradle:gradle . /home/gradle/src
WORKDIR /home/gradle/src
RUN gradle build --no-daemon

FROM adoptopenjdk/openjdk11
COPY --from=build /home/gradle/src/build/libs/*.jar /app.jar
RUN apt-get update -y
RUN apt-get install libpcap-dev -y
RUN apt-get install wget
RUN wget -O /usr/lib/jnet.tgz "https://downloads.sourceforge.net/project/jnetpcap/jnetpcap/Latest/jnetpcap-1.4.r1425-1.linux64.x86_64.tgz?ts=1615727981&r=https%3A%2F%2Fsourceforge.net%2Fprojects%2Fjnetpcap%2Ffiles%2Fjnetpcap%2FLatest%2Fjnetpcap-1.4.r1425-1.linux64.x86_64.tgz%2Fdownload"
RUN tar -xvzf /usr/lib/jnet.tgz -C /usr/lib/
RUN mv /usr/lib/"jnetpcap-1.4.r1425"/libjnetpcap* /usr/lib/
RUN mv /usr/lib/"x86_64-linux-gnu"/libpcap* /usr/lib/
ENV TMPDIR /tmp/
ENV LD_LIBRARY_PATH /usr/lib/
ENTRYPOINT ["java","-jar","/app.jar","--spring.profiles.active=docker"]
