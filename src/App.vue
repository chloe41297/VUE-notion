<template>
    <div class="app__inner">
        <LNB/>
        <div class="app__page">
            <div class="page__header"></div>
            <div class="page__container">
                <RouterView/>
            </div>
        </div>
    </div>
</template>

<script>
import LNB from '~/components/LNB'
export default {
    components: {
        LNB
    }
}
</script>

<style lang="scss" scoped>

   .app__inner{
        font-family: 'Noto Sans KR', sans-serif;
        font-size: 18px;
        color:$color-font;
        line-height: 1.4;
        display: flex;
        height: 100vh;
        .app__page{
            height:  100%;
            flex-grow: 1;
            display: flex;
            flex-direction: column;
            .page__header{
                height: 80px;
            }
            .page__container{
                flex-grow: 1;
                overflow-y:auto ;
            }
        }
    }
</style>