CREATE TABLE FansOnly(id AutoNumber NOT NULL PRIMARY KEY, name TEXT NOT NULL, type BOOL NOT NULL, smallInfo TEXT NOT NULL, description TEXT NOT NULL, image TEXT NOT NULL);

INSERT INTO FansOnly(id, name, type, smallInfo, description, image) VALUES (1, "TestFan", True, "Yap Yap", "YAP YAP YAP", "Link");

DROP TABLE FansOnly;