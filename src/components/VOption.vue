<template>
    <ValidationProvider :name="$attrs.label" :rules="rules">
        <v-checkbox
                slot-scope="{ errors, valid }"
                v-model="innerValue"
                :error-messages="errors"
                :success="valid"
                type="checkbox"
                v-bind="$attrs"
                v-on="$listeners"
        ></v-checkbox>
    </ValidationProvider>
</template>

<script>
    import {ValidationProvider} from "vee-validate"

    export default {
        name: 'VOption',
        components: {
            ValidationProvider
        },
        props: {
            rules: {
                type: [Object, String],
                default: ''
            },
            // must be included in props
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
            if (this.value) {
                this.innerValue = this.value;
            }
        }
    }
</script>
