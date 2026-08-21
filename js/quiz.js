const { createApp } = Vue;
// ===================================================
createApp({
	data() {
		return {
			end: false,
			steps: [
				{
					num: 1,
					active: true,
				},
				{
					num: 2,
					active: false,
				},
				{
					num: 3,
					active: false,
				},
				{
					num: 4,
					active: false,
				},
				{
					num: 5,
					active: false,
				},
			]
		};
	},
	methods: {
		prevStep() {
			let activeIndex = this.activeIndex;
			if (activeIndex != 1) {
				activeIndex--;
				this.switchStep(activeIndex);
			}
		},
		nextStep() {
			let activeIndex = this.activeIndex;
			activeIndex++;
			this.switchStep(activeIndex);
		},
		switchStep(index) {
			for (let step of this.steps) {
				step.done = false;
				step.active = false;
				
				if (step.num < index) {
					step.done = true;
					step.active = false;
				}

				if (step.num == index) {
					step.done = false;
					step.active = true;
				}
			}
		},
		endSteps() {
			this.end = true;
		},
		resetSteps() {
			this.switchStep(1);
			this.end = false;
		}
	},
	computed: {
		activeIndex() {
			for (let step of this.steps) {
				if (step.active) {
					return step.num
				}
			}
		}
	}
}).mount("#quiz-dialog");
// ===================================================
