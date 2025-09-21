<template>
    <QuillyEditor
        ref="editor"
        v-model="contentModel"
        :options="options"
        @update:model-value="onModelValueChange"
        @text-change="onTextChange"
        @selection-change="onSelectionChange"
        @editor-change="onEditorChange"
    />
</template>

<script setup lang="ts">
import {type ComputedRef, onMounted, ref} from 'vue'
import { QuillyEditor } from 'vue-quilly'
import {Delta, type QuillOptions, Range} from 'quill/core'
import Quill from 'quill'
import 'quill/dist/quill.snow.css'

type Props = { options?: QuillOptions };

const props = withDefaults(defineProps<Props>(), { options: () => ({}) }),
    editor = ref<InstanceType<typeof QuillyEditor>>(),
    editorDelta = ref<Delta>(),
    editorRange = ref<Range>(),
    defaultOptions: QuillOptions = { theme: 'snow' },
    options: ComputedRef<QuillOptions> = computed(() => ({ ...defaultOptions, ...props.options }));


let quill: Quill | null = null

onMounted(() => { quill = editor.value?.initialize(Quill)! });

const contentModel = defineModel('content', { default: "" }),
    eventModel = defineModel('event'),
    onModelValueChange = (value: string) => contentModel.value = value,
    onTextChange = (({ delta }: { delta: Delta }) => (editorDelta.value = delta)),
    onSelectionChange = ({ range }: { range: Range }) => (editorRange.value = range),
    onEditorChange = (eventName: string) => eventModel.value = eventName
</script>