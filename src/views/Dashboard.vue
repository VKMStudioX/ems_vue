<template>
    <div class="p-grid-all p-p-0">
        <Header />
        <div class="p-grid p-jc-start p-grid-nested-router">
            <div class="p-col-12">
                <router-view></router-view>
            </div>
        </div>
        <Footer />
    </div>
</template>

<script>
import Header from "./Header";
import Footer from "./Footer";

export default {
    name: "Dashboard",
    components: { Footer, Header },
    setup() {
        return {};
    },
}

</script>


<style lang="scss">
</style>