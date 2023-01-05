<script setup>
import { ref } from 'vue'
import Editor from '@tinymce/tinymce-vue'
import * as tinyMceCustomIcon from '../../../utils/tinyMceCustomIcon'

const emit = defineEmits(['processText'])
const props = defineProps({
   contentValue: {
      type: String,
      default: '',
   },
})
const tinyMceOptions = ref({
   apiKey: 'emcqski0nlymetzrqpc6wq5pg0klreddh5chpfs8qipwf9jk',
   init: {
      menubar: false,
      toolbar:
         'undo redo | blocks | bold italic |  bullist numlist | customSave',
      plugins: 'save lists',
      save_onsavecallback: () => {
         pushTextArticle()
      },
      setup: (editor) => {
         editor.ui.registry.addIcon(
            'customSaveIcon',
            tinyMceCustomIcon.save('18')
         )
         editor.ui.registry.addButton('customSave', {
            icon: 'customSaveIcon',
            enabled: false,
            onAction: (_) => {
               /* pushTextArticle() */
               emit('processText', editor.getContent())
               editor.setContent('')
               _.setEnabled(false)
            },
            onSetup: (buttonApi) => {
               const formChanged = (eventApi) => {
                  if (!editor.getContent()) {
                     buttonApi.setEnabled(false)
                  } else {
                     buttonApi.setEnabled(true)
                  }
               }
               editor.on('input', formChanged)

               return () => editor.off('input', formChanged)
            },
         })
      },
   },
   contentValue: props.contentValue,
})
</script>
<template>
   <div class="tinymce__wrapper">
      <form>
         <Editor
            :api-key="tinyMceOptions.apiKey"
            :init="tinyMceOptions.init"
            v-model="tinyMceOptions.contentValue"
         />
      </form>
   </div>
</template>
