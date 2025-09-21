export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.directive('tel-mask', {
        mounted (el, binding) {
            const mask = binding.value,
                first = mask.indexOf('_'),
                clean = mask.replace(/[^0-9_]/gm, ''),
                indexes: number[] = [],
                input = el.querySelector('input');

            if(!input) return;

            for(let i = 0; i < clean.length; i++){
                if(!isNaN(clean[i])) indexes.push(i);
            }

            input.value = mask
            input.clean = mask.replace(/[^0-9]/gm, '')

            function maskIt(event, start){
                let value = input.value,
                    filtred = value.replace(/[^0-9]/gm, ''),
                    result = ''

                if(value.length < first){
                    value = mask + value
                    filtred = value.replace(/[^0-9]/gm, '')
                }

                for(let i = 0; i < filtred.length; i++){
                    if(indexes.indexOf(i) == -1){
                        result += filtred[i]
                    }
                }

                value = '';
                let cursor = 0

                for(let i = 0; i < mask.length; i++){
                    if(mask[i] == '_' && result){
                        value += result[0]
                        result = result.slice(1)
                        cursor = i + 1

                    }else{
                        value += mask[i]
                    }
                }

                if(cursor < first){
                    cursor = first
                }

                input.value = value

                input.clean = input.value.replace(/[^0-9]/gm, '')

                input.setSelectionRange(cursor,cursor)
            }

            input.addEventListener('focus', function(event){
                event.preventDefault()
            });

            input.addEventListener('click', function(event){
                event.preventDefault()
                let start = input.value.indexOf('_')

                if(start == -1){
                    start = input.value.length
                }

                input.setSelectionRange(start,start)

            });

            input.addEventListener('paste', function(event){
                const start = input.selectionStart

                if(start < first){
                    input.value = '_' + input.value
                }
            });

            input.addEventListener('input', function(event){
                const start = input.selectionStart
                maskIt(event, start)
            });
        }
    });
});