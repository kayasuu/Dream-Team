function logout() {
    axios.delete("/api/session").then((_) => {
        setLoggedOutHeader()
        renderBucketList();
    });
}