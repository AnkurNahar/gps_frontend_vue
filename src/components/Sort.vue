<script setup>
    import { watch, ref } from 'vue'
    
    const emit = defineEmits(['update-sorting'])

    const props = defineProps({
        sort_by: {
          type: String,
          required: true,
          default: "display_name"
        }
    })    

    const sorting = ref(props.sort_by)

    watch(() => props.sort_by, (newValue) => { sorting.value = newValue }, { immediate: true })
    
    /* const form = reactive({
        sorting: `${props.sort_by}`
    }) */

    const handleChange = () => {
        try {
            emit('update-sorting', sorting.value)           
        } catch (error) {
            console.error(error);
            
        }
    }
    
</script>

<template>
  <section>
    <div class="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
      <form>
        <div class="mb-4">
          <label for="sorting" class="block text-gray-700 font-bold mb-2">
            Sort By
          </label>
          <select
            @change="handleChange"
            id="sorting"
            name="sorting"
            class="border rounded w-full py-2 px-3"
            v-model="sorting"
            required
          >
          <!--:selected="props.sort_by === 'display_name'"-->
            <option value="display_name">name</option>
            <option value="speed" >speed</option>
          </select>
        </div>
      </form>
    </div>
  </section>
</template>