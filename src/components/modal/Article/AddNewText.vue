<script setup>
import { ref } from 'vue'
import Editor from '@tinymce/tinymce-vue'
import * as tinyMceCustomIcon from '../../../utils/tinyMceCustomIcon'

const emit = defineEmits(['processText', 'processEdit', 'setTinyMceArgs'])
const props = defineProps({
   textToEdit: {
      type: Object,
      default: {
         value: '',
         index: 0,
      },
   },
   purpose: {
      type: String,
      default: 'add',
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
         editor.on('init', editorInit)
         editor.on('remove', editorClose)
         editor.ui.registry.addIcon(
            'customSaveIcon',
            tinyMceCustomIcon.save('18')
         )
         editor.ui.registry.addButton('customSave', {
            icon: 'customSaveIcon',
            enabled: false,
            onAction: (_) => {
               /* pushTextArticle() */
               if (props.purpose === 'add') {
                  emit('processText', editor.getContent())
               } else if (props.purpose === 'edit') {
                  emit(
                     'processEdit',
                     editor.getContent(),
                     props.textToEdit.index
                  )
               }
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
})

function editorInit(editor) {
   if (props.purpose == 'edit') {
      editor.target.setContent(props.textToEdit.value)
   }
}

function editorClose(editor) {
   const { buttons } = editor.target.ui.registry.getAll()
   buttons.customsave.enabled = false
   editor.target.setContent('')
}
</script>
<template>
   <div class="tinymce__wrapper">
      <form>
         <Editor :api-key="tinyMceOptions.apiKey" :init="tinyMceOptions.init" />
      </form>
   </div>
</template>
