package org.example;

import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import org.bson.Document;
import org.bson.types.ObjectId;

public class Main {
    public static void main(String[] args) {
        String uri = "mongodb://localhost:27017";
        try (MongoClient mongoClient = MongoClients.create(uri)){
            MongoDatabase database = mongoClient.getDatabase("TelegramBot");
            MongoCollection<Document> testCollection = database.getCollection("Test");
            Document testBson = testCollection.find(new Document("name","Dmitriy")).first();
            System.out.println(testBson.toJson());
            Document lizaDocument = new Document("_id", new ObjectId());
            lizaDocument
                    .append("name", "Elizaveta")
                    .append("age", 21);
            testCollection.insertOne(lizaDocument);
            Document yuraDocument = new Document("_id", new ObjectId());
            yuraDocument
                    .append("name", "Yurii")
                    .append("age", 22);
            testCollection.insertOne(yuraDocument);
        }
    }
}