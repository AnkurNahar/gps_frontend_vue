<script setup>
    import { reactive } from 'vue'
    
    const emit = defineEmits(['update-sorting'])

    const props = defineProps({
        sort_by: String,
    })    
    
    const form = reactive({
        sorting: `${props.sort_by}`
    })

    console.log(form.sorting);

    const handleChange = () => {
        try {
            emit('update-sorting', form.sorting)           
        } catch (error) {
            console.error(error);
            
        }
    }
    
</script>

<template>
  <section class="bg-green-50">
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
            v-model="form.sorting"
            required
          >
            <option value="display_name">name</option>
            <option value="speed">speed</option>
          </select>
        </div>
      </form>
    </div>
  </section>
</template>