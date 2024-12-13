<script setup>
    import DetailsOnlyTable from '@/components/DetailsOnlyTable.vue'
    import Navbar from '@/components/Navbar.vue';
</script>

<template>
    <Navbar :title="'Total Devices'" :home="0"/>

    <section class="bg-blue-50 px-10 py-20">
        <div class="container-xl lg:container m-auto">
            <div class="bg-blue-50">
                <div class="flex flex-col mt-8">
                    <div class="py-2 -my-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
                        <div class="inline-block min-w-full overflow-hidden align-middle border-b border-gray-200 shadow sm:rounded-lg">
                            <DetailsOnlyTable />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>