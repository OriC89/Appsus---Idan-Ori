export function useToggle(initialValue = false) {

    const [value, setValue] = React.useState(initialValue)
    const toggleColor = React.useCallback(() => {

        setValue(value => !value)
    }, [])
    
    return [value, toggleColor]
}