<template>
    <div class="footer">
        <p>© <a href="https://github.com/gonzsanz" target="_blank">gonzsanz</a></p>
    </div>
</template>

<style scoped>
.footer {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: var(--green-700);
    color: #fff;
    text-align: center;
    padding: 20px 0;
    position: absolute;
    bottom: 0;
    clear: both;
    width: 100%;
    height: 0.3rem;
}

a {
    font-style: none;
    color: white;
    text-decoration: none;
}

p {
    color: white;
    font-size: small;
}
</style>