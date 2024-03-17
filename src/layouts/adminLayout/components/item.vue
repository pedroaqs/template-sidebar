<template>
    <v-icon v-if="icon" :name="icon" />
    <span slot='title' style="margin-left: 10px;">{{title}}</span>
</template>
<script>
export default {
  name: 'MenuItem',
  functional: true,
  props: {
    icon: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    }
  },
  // render(h, context) {
  //   const { icon, title } = context.props
  //   const vnodes = []

  //   if (icon && icon.startsWith('el-')) {
  //     // if (icon.includes('el-icon')) {
  //     // vnodes.push(<i class={[icon, 'sub-el-icon']} />)
  //     vnodes.push(<i class={icon} />)
  //   } else {
  //     vnodes.push(<svg-icon icon-class={icon}/>)
  //   }
  //   // }

  //   if (title) {
  //     vnodes.push(<span slot='title'>{(title)}</span>)
  //   }
  //   return vnodes
  // }
}
</script>

<style scoped>
.sub-el-icon {
  color: currentColor;
  width: 1em;
  height: 1em;
}

.el-submenu [class^="el-icon-"] {
  color: currentColor;
  text-align: left;
}
</style>
