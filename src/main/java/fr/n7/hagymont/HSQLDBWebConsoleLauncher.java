package fr.n7.hagymont;

import org.hsqldb.server.WebServer;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class HSQLDBWebConsoleLauncher implements CommandLineRunner {

    @Value("${hsqldb.server.port:9001}")
    private int port;

    private String path = "./data/hagymontdb";

    @Override
    public void run(String... args) {
        WebServer server = new WebServer();

        server.setDatabaseName(0, "hagymontdb");
        server.setDatabasePath(0, "file:" + path);
        server.setPort(port);

        server.start();
        System.out.println("HSQLDB Web Console (file:" + path + ") accessible at http://localhost:" + port + "/");
    }
}