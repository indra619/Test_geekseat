import MyForm from './Form.vue';

export default {
    title: 'Example/Form',
    component: MyForm,
    parameters: {
        // More on Story layout: https://storybook.js.org/docs/vue/configure/story-layout
        layout: 'fullscreen',
    },
};

const Template = () => ({
    components: { MyForm },
    template: '<Form-Tamu />',
});

export const form = Template.bind({});

// More on interaction testing: https://storybook.js.org/docs/vue/writing-tests/interaction-testing