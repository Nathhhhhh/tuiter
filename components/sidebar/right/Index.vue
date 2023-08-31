<script setup>
const trends = ref([
	{
		id: 1,
		title: 'SpaceX',
		count: '18.8k tweets'
	},
	{
		id: 2,
		title: '#KCORPWIN',
		count: '200.1k tweets'
	},
]);

const suggestions = ref([
	{
		id: 1,
		name: 'Nathan',
		handle: '@nathe',
		image: 'https://picsum.photos/200/200'
	},
	{
		id: 2,
		name: 'Nathan',
		handle: '@nathe',
		image: 'https://picsum.photos/200/200'
	},
	{
		id: 3,
		name: 'Nathan',
		handle: '@nathe',
		image: 'https://picsum.photos/200/200'
	}
]);

</script>

<template>
	<div class="flex flex-col">
		<PreviewCard title="Tendance">
			<PreviewCardItem v-for="trend in trends" :key="trend.id">
				<h2 class="font-bold text-gray-800 text-md dark:text-white">{{ trend.title }}</h2>
				<p class="text-gray-400 text-md">
					{{ trend.count }}
				</p>
			</PreviewCardItem>
		</PreviewCard>
		<PreviewCard title="Suggestion">
			<PreviewCardItem v-for="suggestion in suggestions" :key="suggestion.id">
				<div class="flex flex-row items-center justify-between p-2">
					<div class="flex flex-row items-center">
						<img class="w-10 h-10 rounded-full" :src="suggestion.image" :alt="suggestion.name">
						<div class="flex flex-col ml-3">
							<h2 class="text-lg font-bold text-gray-900 dark:text-white">{{ suggestion.name }}</h2>
							<p class="text-gray-400 text-md">{{ suggestion.handle }}</p>
						</div>
					</div>
					<div class="flex items-center h-full">
						<button class="px-4 py-2 font-bold text-white bg-black rounded-full text-md dark:text-black dark:bg-white" type="button">Suivre</button>
					</div>
				</div>
			</PreviewCardItem>
		</PreviewCard>
	</div>
</template>