<script setup>
defineProps({
  modelValue: String,
  placeholder: { type: String, default: 'Caută...' }
})

defineEmits(['update:modelValue'])
</script>

<template>
  <div class="search-box">
    <i class="bi bi-search search-icon" />
    <input
      :value="modelValue"
      type="text"
      :placeholder="placeholder"
      class="search-input"
      @input="$emit('update:modelValue', $event.target.value)"
    />
  </div>
</template>

<style scoped>
.search-box {
  margin-bottom: 20px;
  position: relative;
}

.search-icon {
  position: absolute;
  left: 15px;
  top: 50%;
  transform: translateY(-50%);
  color: #999;
  font-size: 1.2rem;
}

.search-input {
  width: 100%;
  padding: 12px 20px 12px 45px;
  font-size: 16px;
  border: 2px solid #ddd;
  border-radius: 8px;
  transition: border-color 0.3s;
}

.search-input:focus {
  outline: none;
  border-color: #4caf50;
}
</style>
