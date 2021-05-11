# Installation and execution:
## Preface
Because of a problem with `jnetpcap` library (noted in https://github.com/ruedigergad/clj-net-pcap/issues/13), sometimes 
`libpcap` library won't be linked with application. This error doesn't produce an exception or crash, but it is visible in the run-time.
If the library isn't linked correctly, parsing of an uploaded .PCAP file will always result into a data-source with 0 packets.
Furthermore, parsing will run unexpectedly fast (because no parsing is actually occuring).

If this problem arises, the user is required to restart the back-end. Commands for this are listed as last points in each section.

The most suitable web-browser for this application is __Firefox__. It has dynamic stack size increase, therefore it is able to
run even the most complex visualizations.
## Docker
* Download and install Docker from https://docs.docker.com/engine/install/ .
* With command `docker-compose -f docker-compose.remote.yml up` in root directory start the application. This step will download and isntall
  images of back-end, front-end a database, and it will run them as a stack in correct order.
* After installation and execution, open the web browser at: `localhost:80`.
### Restart back-end
* Command `docker-compose restart backend`
## Manual
### Database
* Follow the instructions at https://docs.timescale.com/timescaledb/latest/how-to-guides/install-timescaledb/self-hosted/
 ### Back-end
* Download OpenJDK 11 (Java Development Kit) from https://jdk.java.net/java-se-ri/11 and install it.
* Download Gradle from https://gradle.org/install/
* Install `libpcap` library (Ubuntu's command: `sudo apt-get install libpcap-dev -y`)
* Download `jnetpcap` library with command (as root)  `wget -O /usr/lib/jnet.tgz "https://downloads.sourceforge.net/project/jnetpcap/jnetpcap/Latest/jnetpcap-1.4.r1425-1.linux64.x86_64.tgz?ts=1615727981&r=https%3A%2F%2Fsourceforge.net%2Fprojects%2Fjnetpcap%2Ffiles%2Fjnetpcap%2FLatest%2Fjnetpcap-1.4.r1425-1.linux64.x86_64.tgz%2Fdownload"`
* Move library files to `LD_LIBRARY_PATH` (commands 
`# mv /usr/lib/"jnetpcap-1.4.r1425"/libjnetpcap* /usr/lib/`
`# mv /usr/lib/"x86_64-linux-gnu"/libpcap* /usr/lib/`
)
* Set (if it's not set yet) temporary directory `TMPDIR` to `/tmp/`
* Set (if it's not set yet) `LD_LIBRARY_PATH` to `/usr/lib/`
* Compile the back-end with command `gradle build --no-daemon`
* Run the back-end with command `gradlew bootRun --args='--spring.profiles.active=local'`
 ### Front-end
* Install `NodeJS` from https://nodejs.org/en/download/
* Change directory to `front-end` from the root directory
* Install dependencies with command `yarn install`
* Run front-end with command `yarn start`
* Open web browser at `localhost:3000`
### Restart back-end
Kill the gradle process (simple `Ctrl+C` if you left ther terminal window open) and redo last step of Back-end section
