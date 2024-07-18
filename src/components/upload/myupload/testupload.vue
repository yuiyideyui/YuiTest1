<template>
    <el-upload
        class="avatar-uploader"
        list-type="picture-card"
        :before-upload="beforeAvatarUpload"
        :http-request="selectImg"
    >
        <img
            v-if="imageUrl"
            :src="imageUrl"
            class="avatar"
        />
        <el-icon
            v-else
            class="avatar-uploader-icon"
        >
            <Plus />
        </el-icon>
    </el-upload>
    <img :src="testimg" alt="">
</template>
  
<script setup>
import { ref } from 'vue'
import { Plus } from '@element-plus/icons-vue'

const imageUrl = ref('')
const testimg = ref('')
//转16：9
const beforeAvatarUpload = (file) => {
    console.log('beforeAvatarUpload',file);
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (event) => {
            const image = new Image();
            // console.log('e.target.result',event.target.result);
            image.onload = (e) => {
                const aspectRatio = image.width / image.height;
                const targetAspectRatio = 16 / 9;
                let newFile = file;
                if (aspectRatio !== targetAspectRatio) {
                    const canvas = document.createElement('canvas');
                    const context = canvas.getContext('2d');
                    const maxWidth = image.height * targetAspectRatio;
                    const maxHeight = image.width / targetAspectRatio;
                    const width = Math.min(image.width, maxWidth);
                    const height = Math.min(image.height, maxHeight);
                    canvas.width = width;
                    canvas.height = height;
                    context.drawImage(image, 0, 0, width, height);
                    canvas.toBlob((blob) => {
                        newFile = new File([blob], 'hello.png', { type: file.type });
                        testimg.value = URL.createObjectURL(newFile);
                        resolve(newFile);
                    }, file.type);
                } else {
                    resolve(file);
                }
            };
            image.src = event.target.result;
        };
        reader.readAsDataURL(file);
    });
}
const selectImg = (file)=>{
    console.log('file',file);
}
</script>
  
<style scoped>
.avatar-uploader .avatar {
    width: 178px;
    height: 178px;
    display: block;
}
</style>
  
<style>
.avatar-uploader .el-upload {
    border: 1px dashed var(--el-border-color);
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
    border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    text-align: center;
}
</style>
  