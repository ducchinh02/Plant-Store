<template>
  <svg
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    x="0px"
    y="0px"
    width="100%"
    height="100%"
    viewBox="0 0 100 100"
    enable-background="new 0 0 100 100"
    xml:space="preserve"
  >
    <g id="sun">
      <path
        d="M50,31.7c-9.9,0-18,8.1-18,18s8.1,18,18,18s18-8.1,18-18S59.9,31.7,50,31.7z M50,65.7c-8.8,0-16-7.2-16-16s7.2-16,16-16
					s16,7.2,16,16S58.8,65.7,50,65.7z"
      />

      <g class="odd">
        <line
          fill="none"
          stroke=""
          stroke-width="2"
          stroke-linecap="round"
          stroke-miterlimit="10"
          x1="50"
          y1="71.6"
          x2="50"
          y2="80.9"
        />
        <line
          fill="none"
          stroke="#"
          stroke-width="2"
          stroke-linecap="round"
          stroke-miterlimit="10"
          x1="50"
          y2="18.4"
          x2="50"
          y1="27.7"
        />
        <line
          fill="none"
          stroke="#000000"
          stroke-width="2"
          stroke-linecap="round"
          stroke-miterlimit="10"
          x1="28"
          y1="49.7"
          x2="18.7"
          y2="49.7"
        />
        <line
          fill="none"
          stroke="#000000"
          stroke-width="2"
          stroke-linecap="round"
          stroke-miterlimit="10"
          x2="81.3"
          y1="49.7"
          x1="72"
          y2="49.7"
        />
      </g>
      <g class="even">
        <line
          fill="none"
          stroke="#000000"
          stroke-width="2"
          stroke-linecap="round"
          stroke-miterlimit="10"
          x1="34.2"
          y1="65.1"
          x2="27.6"
          y2="71.6"
        />
        <line
          fill="none"
          stroke="#000000"
          stroke-width="2"
          stroke-linecap="round"
          stroke-miterlimit="10"
          x2="71.8"
          y2="27.4"
          x1="65.2"
          y1="34"
        />
        <line
          fill="none"
          stroke="#000000"
          stroke-width="2"
          stroke-linecap="round"
          stroke-miterlimit="10"
          x1="34.2"
          y1="34"
          x2="27.6"
          y2="27.4"
        />
        <line
          fill="none"
          stroke="#000000"
          stroke-width="2"
          stroke-linecap="round"
          stroke-miterlimit="10"
          x2="71.8"
          y2="71.7"
          x1="65.2"
          y1="65.1"
        />
      </g>
    </g>
  </svg>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
svg {
  #sun {
    animation-duration: 10s;
    animation-timing-function: linear;
    animation-delay: 0;
    animation-iteration-count: infinite;
    transform-origin: 50% 50%;
    stroke: #f5b501;
    fill: #f5b501;
    stroke-width: 2px;
  }
  line {
    stroke-width: 4px;
    fill: none;
    stroke: #f5b501;
    stroke-dasharray: 11px;
    stroke-dashoffset: 4px;
    animation-duration: 2s;
    animation-timing-function: ease-in-out;
    animation-delay: 0;
    animation-iteration-count: infinite;
  }
  .even line {
    animation-name: pulse;
    &:nth-child(1) {
      animation-delay: 0.3s;
    }
    &:nth-child(2) {
      animation-delay: 0.2s;
    }
    &:nth-child(3) {
      animation-delay: 0.4s;
    }
  }
  .odd line {
    animation-name: pulse-rev;
    stroke-dashoffset: 11px;

    &:nth-child(1) {
      animation-delay: 0.1s;
    }
    &:nth-child(2) {
      animation-delay: 0.2s;
    }
    &:nth-child(3) {
      animation-delay: 0.4s;
    }
  }
}

@keyframes pulse {
  0% {
    stroke-dashoffset: 0px;
  }
  50% {
    stroke-dashoffset: 6px;
  }
  100% {
    stroke-dashoffset: 0px;
  }
}

@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@keyframes pulse-rev {
  0% {
    stroke-dashoffset: 6px;
  }
  50% {
    stroke-dashoffset: 0px;
  }
  100% {
    stroke-dashoffset: 6px;
  }
}
</style>
