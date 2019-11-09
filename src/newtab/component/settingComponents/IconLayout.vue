<template>
    <div class="setting-modal setting-modal-not-first">
        <p class="setting-type-name">
            {{ layout }}
        </p>
        <div class="setting-layout-wrap">
            <div class="setting-layout layout-2-4">
                <div class="setting-layout-item">
                    <div v-for="(i, index) in 8" :key="index" @click="setLayout('2x4', 2, 4)" class="layout-block" :style="{width: '28px', height: '35px', backgroundColor: (iconLayout.name=='2x4' ? '#ffc81f' : '#ccc')}">

                    </div>
                </div>
                <p class="layout-title">2 x 4</p>
            </div>
            <div class="setting-layout layout-2-5">
                <div class="setting-layout-item">
                    <div v-for="(i, index) in 10" :key="index" @click="setLayout('2x5', 2, 5)" class="layout-block" :style="{width: '22px', height: '35px', backgroundColor: (iconLayout.name=='2x5' ? '#ffc81f' : '#ccc')}">

                    </div>
                </div>
                <p class="layout-title">2 x 5</p>
            </div>
            <div class="setting-layout layout-2-6">
                <div class="setting-layout-item">
                    <div v-for="(i, index) in 12" :key="index" @click="setLayout('2x6', 2, 6)" class="layout-block" :style="{width: '18px', height: '35px', backgroundColor: (iconLayout.name=='2x6' ? '#ffc81f' : '#ccc')}">

                    </div>
                </div>
                <p class="layout-title">2 x 6</p>
            </div>
            <div class="setting-layout layout-2-7">
                <div class="setting-layout-item">
                    <div v-for="(i, index) in 14" :key="index" @click="setLayout('2x7', 2, 7)" class="layout-block" :style="{width: '15px', height: '35px', backgroundColor: (iconLayout.name=='2x7' ? '#ffc81f' : '#ccc')}">

                    </div>
                </div>
                <p class="layout-title">2 x 7</p>
            </div>
            <div class="setting-layout layout-3-3">
                <div class="setting-layout-item">
                    <div v-for="(i, index) in 9" :key="index" @click="setLayout('3x3', 3, 3)" class="layout-block" :style="{width: '38px', height: '23px', backgroundColor: (iconLayout.name=='3x3' ? '#ffc81f' : '#ccc')}">

                    </div>
                </div>
                <p class="layout-title">3 x 3</p>
            </div>
            <div class="setting-layout layout-3-4">
                <div class="setting-layout-item">
                    <div v-for="(i, index) in 12" :key="index" @click="setLayout('3x4', 3, 4)" class="layout-block" :style="{width: '28px', height: '23px', backgroundColor: (iconLayout.name=='3x4' ? '#ffc81f' : '#ccc')}">

                    </div>
                </div>
                <p class="layout-title">3 x 4</p>
            </div>
            <div class="setting-layout layout-3-5">
                <div class="setting-layout-item">
                    <div v-for="(i, index) in 15" :key="index" @click="setLayout('3x5', 3, 5)" class="layout-block" :style="{width: '22px', height: '23px', backgroundColor: (iconLayout.name=='3x5' ? '#ffc81f' : '#ccc')}">

                    </div>
                </div>
                <p class="layout-title">3 x 5</p>
            </div>
            <div class="setting-layout layout-3-6">
                <div class="setting-layout-item">
                    <div v-for="(i, index) in 18" :key="index" @click="setLayout('3x6', 3, 6)" class="layout-block" :style="{width: '18px', height: '23px', backgroundColor: (iconLayout.name=='3x6' ? '#ffc81f' : '#ccc')}">

                    </div>
                </div>
                <p class="layout-title">3 x 6</p>
            </div>
            <div class="setting-layout layout-3-7">
                <div class="setting-layout-item">
                    <div v-for="(i, index) in 21" :key="index" @click="setLayout('3x7', 3, 7)" class="layout-block" :style="{width: '15px', height: '23px', backgroundColor: (iconLayout.name=='3x7' ? '#ffc81f' : '#ccc')}">

                    </div>
                </div>
                <p class="layout-title">3 x 7</p>
            </div>
        </div>
    </div>
</template>
<script>
import { mapGetters, mapState, mapMutations, mapActions } from 'vuex'
import localeText from '../../../../static/locale/index.js'
import './setting.css'
import debounce from '../../utils/debounce.js';

export default {
    name: 'iconLayout',
    data() {
        return {
            layout: '',
        }
    },
    created: function() {
        this.layout = localeText[this.location].layout
    },
    computed: {
        ...mapState('settings', [
            'iconLayout',
        ]),
        ...mapState('locale', [
            'location',
        ])
    },
    methods: {
        setLayout(name, row, col) {
            this.SET_LAYOUT({
                name,
                row,
                col,
            })
            this.uploadSettings({iconLayout: {
                name,
                row,
                col,
            }})
        },
        ...mapMutations('settings', [
            'SET_LAYOUT',
        ]),
        ...mapActions('settings', [
            'uploadSettings',
        ]),
    }
}
</script>
<style scoped>
</style>