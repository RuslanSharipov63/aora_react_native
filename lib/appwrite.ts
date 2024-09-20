import { Account, Avatars, Client, Databases, ID, Query } from 'react-native-appwrite';

export const сonfig = {
    endpoint: "https://cloud.appwrite.io/v1",
    platform: 'com.ruslan.aora',
    projectId: "66e2d446003894f8b85a",
    databaseId: "66e2d66c0008b96dcf78",
    userCollectionId: "66e2db2400232b928c38",
    videoCollectionId: "66e3cdb5000fa64aa2c3",
    storageId: "66e3d05f000c2a183b5f",
}

const {
    endpoint,
    platform,
    projectId,
    databaseId,
    userCollectionId,
    videoCollectionId,
    storageId
} = сonfig;

const client = new Client();

client
    .setEndpoint(сonfig.endpoint)
    .setProject(сonfig.projectId)
    .setPlatform(сonfig.platform)
    ;

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);



 export const createUser = async (email: string, password: string, username: string) => {
    try {
        const newAccount = await account.create(
            ID.unique(),
            email,
            password,
            username,
        )
        if (!newAccount) throw new Error;
        const avatarUrl = avatars.getInitials(username);
        await signIn(email, password);
        const newUser = await databases.createDocument(
            databaseId,
            userCollectionId,
            ID.unique(),
            {
                accountId: newAccount.$id,
                email: email,
                username: username,
                avatar: avatarUrl,
            }
        )
        return newUser;
    } catch (error: any) {
        console.log(error);
        throw new Error(error);
    }

} 

export const signIn = async (email: string, password: string) => {
    try {
        const session = await account.createSession(email, password);
        return session;
    } catch (error: any) {
        throw new Error(error);
    }
}

export const getCurrentUser = async () => {
    try {
        const currentAccount = await account.get();
        if (!currentAccount) throw Error;

        const currentUser = await databases.listDocuments(
            databaseId,
            userCollectionId,
            [Query.equal("accountId", currentAccount.$id)]
        );

        if (!currentUser) throw Error;
        return currentUser.documents[0];
    } catch (error) {
        console.log(error);
    }
}

export const getAllPosts = async () => {
    try {
        const posts = await databases.listDocuments(
           databaseId,
           videoCollectionId
        );
        return posts.documents;
    } catch (error: any) {
        throw new Error(error);
    }
}