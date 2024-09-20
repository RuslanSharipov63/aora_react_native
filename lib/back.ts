const BASE_URL = 'https://www.ruslansharipov.site/aora';

export const createUser = async (email: string, password: string, username: string, avatarUrl = null) => {
    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);
    formData.append('username', username);
    try {
       const response = await fetch(`${BASE_URL}/createuser.php`, {
        method: 'POST',
        body: formData,
       });
       if(!response.ok) {
        return false;
       }
       const data = await response.text();
       console.log(data)
       return data;
    } catch (error) {
        console.log(error);
        return false;
    } finally {
        return false
    }
}