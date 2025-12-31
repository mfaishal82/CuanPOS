#**Vue Directives** dan **Features**
###https://vuejs.org/api/built-in-directives.html
###Disini ada semua directive:
```
- `v-if`, `v-else`, `v-else-if`
- `v-for`
- `v-model`
- `v-bind` (`:`)
- `v-on` (`@`)
- `v-show`
- `v-class`
- dll
```

##v-if / v-else
```
<!-- Hanya render jika true -->
<div v-if="isVisible">Terlihat</div>
<div v-else>Tidak terlihat</div>
```

#v-for
```
<!-- Loop array -->
<div v-for="item in items" :key="item.id">{{ item.name }}</div>

<!-- Loop dengan index -->
<div v-for="(item, index) in items">{{ index }}: {{ item.name }}</div>

<!-- Loop object -->
<div v-for="(value, key) in object">{{ key }}: {{ value }}</div>
```

##v-model
```
<!-- Two-way binding (biasanya di form) -->
<input v-model="username" />

<!-- Sama dengan: -->
<input :value="username" @input="username = $event.target.value" />
```

##v-bind atau :
```
<!-- Dynamic attribute -->
<img :src="imagePath" />
<div :class="{ active: isActive }"></div>
<a :href="url">Link</a>

<!-- Shortcut dari: -->
<img v-bind:src="imagePath" />
```

##v-on atau @
```
<!-- Event listener -->
<button @click="handleClick">Click me</button>
<input @keyup.enter="handleSearch" />

<!-- Shortcut dari: -->
<button v-on:click="handleClick">Click me</button>
```

#Cheat Sheet Cepat:
```
<!-- Conditional -->
<div v-if="condition">Jika true</div>
<div v-else-if="otherCondition">Jika kondisi lain</div>
<div v-else>Jika semua false</div>

<!-- Loop -->
<div v-for="item in items" :key="item.id">{{ item }}</div>

<!-- Two-way binding (form) -->
<input v-model="name" />
<select v-model="category">
  <option v-for="cat in categories" :value="cat.id">{{ cat.name }}</option>
</select>

<!-- Binding attributes -->
<img :src="url" :alt="title" />
<div :class="{ active: isActive }"></div>

<!-- Events -->
<button @click="handleClick">Click</button>
<input @keyup.enter="search" />

<!-- Dynamic content -->
<p>{{ username }} - {{ age }}</p>
<p>{{ message.toUpperCase() }}</p>
```
