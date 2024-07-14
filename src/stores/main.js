import { ref, computed, watch } from 'vue'
import { defineStore } from 'pinia'
import { useRouter, useRoute } from "vue-router";
import axios from 'axios';

export const useMainStore = defineStore('main', () => {
    const router = useRouter();
    const route = useRoute();
    const token = JSON.parse(localStorage.getItem('access_token'));
    const mainRoute = ref("");
    const innerRoute = ref("");
    const activeContent = ref("");

    const articles = ref();

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


    const activeBgUrl = computed(() => {
        return bgList.value.find(el => el.is_active == true).route
    })

    const mainItems = ref([
        {
            id: 1,
            title: "Марказ ҳақида",
            is_active: false,
            side: "left",
            list: [
                {
                    id: 1,
                    title: "Марказ тарихи",
                },
                {
                    id: 2,
                    title: "Вазифа ва функциялари",
                },
                {
                    id: 3,
                    title: "Марказ тузилмаси",
                },
                {
                    id: 4,
                    title: "Раҳбарият",
                },
                {
                    id: 5,
                    title: "Илмий-техник кенгаш",
                },
                {
                    id: 6,
                    title: "Марказ бўлимлари",
                },
            ],
        },
        {
            id: 2,
            title: "Асосий фаолият",
            is_active: false,
            side: "left",
            list: [
                {
                    id: 1,
                    title: "Ихтиро ва фойдали моделлар йўналиши",
                },
                {
                    id: 2,
                    title: "Саноат намуналари, селекция ютуклари, географик кўрсаткичлар товар келиб чиқиш ва жой номлари йўналиши",
                },
            ],
        },
        {
            id: 3,
            title: "Ҳужжатлар",
            is_active: false,
            side: "center",
            list: [
                {
                    id: 1,
                    title: "Соҳага оид халқаро ҳужжатлар",
                },
                {
                    id: 2,
                    title: "Қонунлар",
                },
                {
                    id: 3,
                    title: "Ўзбекистон Республикаси Президентининг фармонлари ва қарорлари",
                },
                {
                    id: 4,
                    title: "Вазирлар Маҳкамасининг қарорлари",
                },
            ],
        },
        {
            id: 4,
            title: "Ҳамкорлик",
            is_active: false,
            side: "center",
            list: [
                {
                    id: 1,
                    title: "ТИҚҚМ",
                    is_active: false,
                    side: 'right-inner',
                    innerList: [
                        {
                            id: 2,
                            title: "ТИККМ лойиҳасининг хужжатлари ва ташкил амалиёти этиш",
                        },
                        {
                            id: 3,
                            title: "ТИҚҚМни ташкил этиш амалиёти",
                        },
                        {
                            id: 4,
                            title: "ТИҚҚМлар рўйхати",
                        },
                    ]
                },
                {
                    id: 2,
                    title: "ТИККМ лойиҳасининг хужжатлари ва ташкил амалиёти этиш",
                },
                {
                    id: 3,
                    title: "ТИҚҚМни ташкил этиш амалиёти",
                },
                {
                    id: 4,
                    title: "ТИҚҚМлар рўйхати",
                },
                {
                    id: 5,
                    title: "Халқаро хамкорлик",
                },
                {
                    id: 6,
                    title: "Кўмаклашиш",
                },
            ],
        },
        {
            id: 5,
            title: "Марказ хизматлари",
            is_active: false,
            side: "center",
        },
        {
            id: 6,
            title: "Интерактив хизматлар",
            is_active: false,
            side: "center",
        },
        {
            id: 7,
            title: "Очиқ маълумотлар",
            is_active: false,
            side: "center",
            list: [
                {
                    id: 1,
                    title: "Контактлар",
                },
                {
                    id: 2,
                    title: "Барча рақамлар",
                },
                {
                    id: 3,
                    title: "Фукаролар мурожаати",
                },
                {
                    id: 4,
                    title: "Куп бериладиган саволлар",
                },
                {
                    id: 5,
                    title: "Банк реквизитлар",
                },
            ],
        },
        {
            id: 8,
            title: "Медиатека",
            is_active: false,
            side: "right",
            list: [
                {
                    id: 1,
                    title: "Марказ янгиликлари",
                },
                {
                    id: 2,
                    title: "Пресс релизлар",
                },
                {
                    id: 3,
                    title: "Фотогаларея",
                },
                {
                    id: 4,
                    title: "Видеогаларея",
                },
            ],
        },
        {
            id: 9,
            title: "Боғланиш",
            is_active: false,
            side: "right",
            list: [
                {
                    id: 1,
                    title: "Контактлар",
                },
                {
                    id: 2,
                    title: "Барча рақамлар",
                },
                {
                    id: 3,
                    title: "Фукаролар мурожаати",
                },
                {
                    id: 4,
                    title: "Куп бериладиган саволлар",
                },
                {
                    id: 5,
                    title: "Банк реквизитлар",
                },
            ],
        },
    ]);

    const isAnyActive = computed(() => {
        return mainItems.value.find(el => el.isOpen == true)
    })

    const getArticles = async () => {
        try {
            const response = await axios.get('http://task.loc.com/api/articles', {
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
                    Authorization: `Bearer ${token}`
                }
            });
            articles.value = Array.from(
                response.data.data.map(article => {
                    return { ...article, isOpen: false }
                }))
        } catch (error) {
            // isError.value = true;
            // const time = setTimeout(() => {
            //     isError.value = false;
            //     clearTimeout(time, 4000);
            // }, 5000);
            console.error('Ошибка при получении данных артиклей:', error);
        } finally {
            getMainRoute(route.params.id);
            getInnerRoute(route.params.id, route.params.itemId);
            // getMainRoute(route.params.id)
            // console.log(articles.value.find(el => el.id == route.params.id).isOpen);
        }
    };

    const getContent = () => {
        activeContent.value = Array.from(articles.value)
            .find((el) => el.id == route.params.id)
            .items.find((el) => el.id == route.params.itemId).content;
        console.log(activeContent.value);
    }

    function changeItemActive(id, itemId) {
        if (!itemId) {

            articles.value.find((item) => item.id == id).isOpen =
                !articles.value.find((item) => item.id == id).isOpen;

            articles.value.map(el => el.id != id ? el.isOpen = false : '')


            articles.value.find((item) => item.id == id).items?.map(el => el.isOpen = false)

        } else if (itemId) {
            let list = articles.value.find((item) => item.id == id).items;
            list.find((item) => item.id == itemId).isOpen = !list.find((item) => item.id == itemId).isOpen
        }
    }

    function changePage(id, item) {
        if (!item.hasOwnProperty("isOpen") || !item.hasOwnProperty("innerList")) {
            router.push(`/home/${id}/${item.id}`);
            changeItemActive(id);
        } else if (item.hasOwnProperty("isOpen")) {
            changeItemActive(id, item.id);
        }
        getContent()
    }

    function changePageRoute(id, itemId) {
        router.push(`/home/${id}/${itemId}`);
    }

    function getInnerRoute(id, itemId) {
        let list = articles.value.find((item) => item.id == id)?.items

        innerRoute.value = list?.find((item) => item.id == itemId)?.title;
    }
    function getInnerRouteList(id) {
        return mainItems.value.find((item) => item.id == id).list
    }
    function getMainRoute(id) {
        mainRoute.value = articles.value.find((item) => item.id == id)?.title;
    }
    return { mainItems, changeItemActive, changePage, changePageRoute, getInnerRouteList, getInnerRoute, getMainRoute, isAnyActive, getArticles, mainRoute, articles, innerRoute, getContent, activeContent }
})
