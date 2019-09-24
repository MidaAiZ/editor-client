<template>
    <div class="setting-modal setting-modal-not-first">
        <p class="setting-type-name">
            {{ layout }}
        </p>
        <div class="setting-layout-wrap">
            <div class="setting-layout layout-2-4">
                <div class="setting-layout-item">
                    <div v-for="i in 8" @click="setLayout('2x4', 2, 4)" class="layout-block" :style="{width: '28px', height: '35px', backgroundColor: (iconLayout.name=='2x4' ? '#ffc81f' : '#ccc')}">

                    </div>
                </div>
                <p class="layout-title">2 x 4</p>
            </div>
            <div class="setting-layout layout-2-5">
                <div class="setting-layout-item">
                    <div v-for="i in 10" @click="setLayout('2x5', 2, 5)" class="layout-block" :style="{width: '22px', height: '35px', backgroundColor: (iconLayout.name=='2x5' ? '#ffc81f' : '#ccc')}">

                    </div>
                </div>
                <p class="layout-title">2 x 5</p>
            </div>
            <div class="setting-layout layout-2-6">
                <div class="setting-layout-item">
                    <div v-for="i in 12" @click="setLayout('2x6', 2, 6)" class="layout-block" :style="{width: '18px', height: '35px', backgroundColor: (iconLayout.name=='2x6' ? '#ffc81f' : '#ccc')}">

                    </div>
                </div>
                <p class="layout-title">2 x 6</p>
            </div>
            <div class="setting-layout layout-2-7">
                <div class="setting-layout-item">
                    <div v-for="i in 14" @click="setLayout('2x7', 2, 7)" class="layout-block" :style="{width: '15px', height: '35px', backgroundColor: (iconLayout.name=='2x7' ? '#ffc81f' : '#ccc')}">

                    </div>
                </div>
                <p class="layout-title">2 x 7</p>
            </div>
            <div class="setting-layout layout-3-3">
                <div class="setting-layout-item">
                    <div v-for="i in 9" @click="setLayout('3x3', 3, 3)" class="layout-block" :style="{width: '38px', height: '23px', backgroundColor: (iconLayout.name=='3x3' ? '#ffc81f' : '#ccc')}">

                    </div>
                </div>
                <p class="layout-title">3 x 3</p>
            </div>
            <div class="setting-layout layout-3-4">
                <div class="setting-layout-item">
                    <div v-for="i in 12" @click="setLayout('3x4', 3, 4)" class="layout-block" :style="{width: '28px', height: '23px', backgroundColor: (iconLayout.name=='3x4' ? '#ffc81f' : '#ccc')}">

                    </div>
                </div>
                <p class="layout-title">3 x 4</p>
            </div>
            <div class="setting-layout layout-3-5">
                <div class="setting-layout-item">
                    <div v-for="i in 15" @click="setLayout('3x5', 3, 5)" class="layout-block" :style="{width: '22px', height: '23px', backgroundColor: (iconLayout.name=='3x5' ? '#ffc81f' : '#ccc')}">

                    </div>
                </div>
                <p class="layout-title">3 x 5</p>
            </div>
            <div class="setting-layout layout-3-6">
                <div class="setting-layout-item">
                    <div v-for="i in 18" @click="setLayout('3x6', 3, 6)" class="layout-block" :style="{width: '18px', height: '23px', backgroundColor: (iconLayout.name=='3x6' ? '#ffc81f' : '#ccc')}">

                    </div>
                </div>
                <p class="layout-title">3 x 6</p>
            </div>
            <div class="setting-layout layout-3-7">
                <div class="setting-layout-item">
                    <div v-for="i in 21" @click="setLayout('3x7', 3, 7)" class="layout-block" :style="{width: '15px', height: '23px', backgroundColor: (iconLayout.name=='3x7' ? '#ffc81f' : '#ccc')}">

                    </div>
                </div>
                <p class="layout-title">3 x 7</p>
            </div>
        </div>
    </div>
</template>
<script>
import { mapGetters, mapState, mapMutations } from 'vuex'
import zh_CN from '../../../../static/locale/zh_CN.js'
import './setting.css'

export default {
    name: 'iconLayout',
    data() {
        return {
            layout: zh_CN.layout,
        }
    },
    computed: {
        ...mapState('settings', [
            'iconLayout',
        ])
    },
    methods: {
        setLayout(name, row, col) {
            this.SET_LAYOUT({
                name,
                row,
                col,
            })
        },
        ...mapMutations('settings', [
            'SET_LAYOUT',
        ]),
    }
}
</script>
<style scoped>
</style>