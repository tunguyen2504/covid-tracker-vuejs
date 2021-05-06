<template>
  <el-card class="info-box" @click="boxSelected(type)">
    <h4>{{ title }}</h4>
    <h2
      :class="{
        'info-box--cases--red': type === 'cases',
        'info-box--cases--black': type === 'deaths',
        'info-box--cases--green': type === 'recovered',
      }"
    >
      +{{ newCases }}
    </h2>
    <p>{{ total }} {{ $t('info_box.in_total') }}</p>
  </el-card>
</template>

<script>
export default {
  props: ['type', 'title', 'newCases', 'total'],
  emits: ['box-selected'],
  data() {
    return {
      active: 'cases',
    }
  },
  methods: {
    boxSelected(type) {
      this.$emit('box-selected', type)
    },
  },
}
</script>

<style scoped>
.info-box {
  flex: 1;
  cursor: pointer;
}

.info-box:not(:last-child) {
  margin-right: 15px;
}

@media (max-width: 500px) {
  .info-box {
    margin-right: 0 !important;
  }

  .info-box:not(:last-child) {
    margin-bottom: 15px;
  }
}

.info-box--selected {
  border-top: 10px solid greenyellow;
}

.info-box--red {
  border-color: red;
}

.info-box--black {
  border-color: black;
}

.info-box--green {
  border-color: greenyellow;
}

.info-box--cases {
  color: lightgreen !important;
  font-weight: 700;
  font-size: 1.75rem;
  margin-bottom: 0.5rem;
}

.info-box--cases--red {
  color: #cc1034 !important;
}

.info-box--cases--black {
  color: black !important;
}

.info-box--cases--green {
  color: greenyellow !important;
}

.info-box--total {
  color: #6c757d;
  font-weight: 500 !important;
  font-size: 0.8rem !important;
  margin-top: 15px !important;
}
</style>