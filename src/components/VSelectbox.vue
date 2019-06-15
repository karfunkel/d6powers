<template>
    <ValidationProvider :name="$attrs.label" :rules="rules">
        <v-select
                slot-scope="{ errors }"
                v-model="innerValue"
                :error-messages="errors"
                v-bind="$attrs"
                v-on="$listeners"
        ></v-select>
    </ValidationProvider>
</template>

<script>
    import {ValidationProvider} from "vee-validate"

    export default {
        name: 'VSelectbox',
        components: {
            ValidationProvider
        },
        props: {
            rules: {
                type: [Object, String],
                default: ''
            },
            value: {
                type: null
            }
        },
        data: () => ({
            innerValue: ''
        }),
        watch: {
            // Handles internal model changes.
            innerValue(newVal) {
                this.$emit('input', newVal);
            },
            // Handles external model changes.
            value(newVal) {
                this.innerValue = newVal;
            }
        },
        created() {
            if (this.value !== null && this.value !== undefined) {
                this.innerValue = this.value;
            }
        }
    };
</script>
