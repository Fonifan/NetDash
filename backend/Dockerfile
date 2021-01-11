FROM adoptopenjdk/openjdk11
RUN apt-get update -y
RUN apt-get install libpcap-dev -y
COPY build/libs/*.jar app.jar
COPY libjnetpcap.so /usr/lib/libjnetpcap.so
COPY libjnetpcap-pcap100.so /usr/lib/libjnetpcap-pcap100.so
ENTRYPOINT ["java","-jar","/app.jar"]
