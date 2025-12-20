import { useEffect, useCallback } from 'react';

export default function useKeyboardShortcuts(shortcuts, dependencies = []) {
  const handleKeyDown = useCallback((event) => {
    const { key, ctrlKey, metaKey, shiftKey, altKey } = event;
    
    // Create a key combination string
    const modifiers = [];
    if (ctrlKey || metaKey) modifiers.push('ctrl');
    if (shiftKey) modifiers.push('shift');
    if (altKey) modifiers.push('alt');
    
    const combination = [...modifiers, key.toLowerCase()].join('+');
    
    // Find matching shortcut
    const shortcut = Object.entries(shortcuts).find(([shortcutKey]) => {
      return shortcutKey.toLowerCase() === combination;
    });
    
    if (shortcut) {
      const [, callback] = shortcut;
      event.preventDefault();
      callback();
    }
  }, dependencies);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);
}
