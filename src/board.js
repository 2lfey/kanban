import { ref, reactive, watch } from "vue"

import { useEventBus } from './hooks/useEventBus'

const { emit, on } = useEventBus()

export const board = reactive({
    planned: {
        title: 'Planned',
        items: []
    },
    inProgress: {
        title: 'In progress',
        items: []
    },
    testing: {
        title: 'Testing',
        items: []
    },
    completed: {
        title: 'Completed',
        items: []
    }
})


export const columns = Object.entries(board).map((entry) => {
    const col = entry[1]
    col.onUpdate = (val, newVal) => {
        const index = col.items.indexOf(val)
        col.items[index] = newVal
    }
    col.onDelete = (val) => {
        const index = col.items.indexOf(val)
        col.items.splice(index, 1)
    }

    col.onMoveLeft = val => {
        if (col.title === 'Planned') {
            return
        }

        if (col.title === 'In progress') {
            col.onDelete(val)
            board.planned.items.push(val)
        } else if (col.title === 'Testing') {

            emit('show-cause-form', val)

        } else { // if (col.title === 'Completed') {
            col.onDelete(val)

            delete val.isExpaired

            board.testing.items.push(val)
        }
    }

    col.onMoveRight = (val) => {
        if (col.title === 'Completed') {
            return
        }

        col.onDelete(val)

        if (col.title === 'Planned') {
            board.inProgress.items.push(val)
        } else if (col.title === 'In progress') {
            board.testing.items.push(val)
        } else { // if (col.title === 'Testing') {
            const [year, month, day] = val.deadline.split('-')
            const now = new Date(Date.now())

            console.log(year, month, day);
            console.log(now);

            if (Number(year) <= now.getFullYear() || (Number(month) <= now.getMonth() && Number(day) < now.getDay())) {
                val.isExpaired = true
            }

            board.completed.items.push(val)
        }
    }

    col.onStar = (val) => {
        const index = col.items.indexOf(val)

        if (!val.isStarred) {
            val.isStarred = true
        } else {
            val.isStarred = false
        }

        col.items[index] = val
    }

    return col
})

export const starred = ref(null)

watch(board, (val) => {
    const plannedStars = val.planned.items.filter(item => item.isStarred)
    const inProgressStars = val.inProgress.items.filter(item => item.isStarred)
    const testingStars = val.testing.items.filter(item => item.isStarred)
    const completedStars = val.completed.items.filter(item => item.isStarred)

    starred.value = [...plannedStars, ...inProgressStars, ...testingStars, ...completedStars]
})

// Saving

watch(board, val => {
	localStorage.setItem('plannedItems', JSON.stringify(val.planned.items))
	localStorage.setItem('inProgressItems', JSON.stringify(val.inProgress.items))
	localStorage.setItem('testingItems', JSON.stringify(val.testing.items))
	localStorage.setItem('completedItems', JSON.stringify(val.completed.items))
}, { deep: true })

// Listeners

on('create-card', (card) => {
	board.planned.items.push(card)
})

