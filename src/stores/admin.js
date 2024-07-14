import { ref, computed, onMounted, reactive } from 'vue'
import { defineStore } from 'pinia'
import { useRouter } from "vue-router";
import axios from "axios";


export const useAdminStore = defineStore('admin', () => {
    const router = useRouter();
    const token = JSON.parse(localStorage.getItem('access_token'));

    const users = ref(null);
    const articles = ref();
    const isError = ref(false);
    const profile = ref({});
    const activeArticle = ref(null)

    const categoryIds = ref(null)

    const changeActiveArticle = (id) => {
        activeArticle.value = id
    }

    const getCategoryIds = async () => {
        try {
            const response = await axios.get('http://task.loc.com/api/articles-ids', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            categoryIds.value = response.data;
        } catch (error) {
            isError.value = true;
            const time = setTimeout(() => {
                isError.value = false;
                clearTimeout(time, 4000);
            }, 5000);
            console.error('Ошибка при получении данных:', error);
        }
    }

    const getUsers = async () => {
        users.value = null
        try {
            const response = await axios.get('http://task.loc.com/api/users', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            users.value = response.data.data;
        } catch (error) {
            isError.value = true;
            const time = setTimeout(() => {
                isError.value = false;
                clearTimeout(time, 4000);
            }, 5000);
            console.error('Ошибка при получении данных пользователей:', error);
        }
    };

    const getArticles = async () => {
        users.value = null
        try {
            const response = await axios.get('http://task.loc.com/api/articles', {
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
                    Authorization: `Bearer ${token}`
                }
            });
            articles.value = response.data.data.map(article => {
                return { ...article, isOpen: false }
            })
            console.log(articles.value);
        } catch (error) {
            isError.value = true;
            const time = setTimeout(() => {
                isError.value = false;
                clearTimeout(time, 4000);
            }, 5000);
            console.error('Ошибка при получении данных артиклей:', error);
        }
    };

    const getProfileUser = async () => {
        try {
            const response = await axios.get('http://task.loc.com/api/users/profile', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            profile.value = response.data.data;
        } catch (error) {
            console.error('Ошибка при получении данных пользователя:', error);
            localStorage.removeItem("access_token");
            router.push("/login");
        }
    }

    const bgList = ref([
        {
            id: 1,
            route: '/src/assets/img/theme/theme1.jpg',
            is_active: true
        },
        {
            id: 2,
            route: '/src/assets/img/theme/theme2.jpg',
            is_active: false
        },
    ])

    const adminActiveWindow = ref([
        {
            id: 1,
            page: 'home',
            is_active: true
        }
    ])


    const activeBgUrl = computed(() => {
        return bgList.value.find(el => el.is_active == true).route
    })


    function changeActiveBg(id) {
        bgList.value.map(el => el.is_active = false);
        bgList.value.find(el => el.id == id).is_active = true;

        let currentBg = bgList.value.find(el => el.id == id).route;

        localStorage.setItem(
            "active_bg",
            JSON.stringify(currentBg)
        );
    }



    return { bgList, activeBgUrl, changeActiveBg, adminActiveWindow, users, getUsers, token, isError, profile, getProfileUser, getArticles, articles, changeActiveArticle, activeArticle, getCategoryIds, categoryIds }
})