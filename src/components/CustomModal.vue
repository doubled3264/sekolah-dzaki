<template>
   <div class="modal__wrapper" @click.stop>
      <div class="card">
         <div class="card__header">
            <div class="card__title">
               <slot name="title"></slot>
            </div>
         </div>
         <div class="card__body">
            <slot name="toggle-form"></slot>
            <slot name="body"></slot>
         </div>
         <div class="card__footer">
            <slot name="footer"></slot>
         </div>
      </div>
   </div>
</template>
