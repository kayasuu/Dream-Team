function logout() {
    axios.delete("/api/session").then((_) => {
        renderHeader();
        renderBucketList();
    });
}