#!/bin/bash

# Theme Migration Helper Script
# This script helps you quickly migrate from old theme hooks to useCentralTheme

echo "🎨 Theme Migration Helper"
echo "========================"

echo "
QUICK FIND & REPLACE GUIDE:
==========================

In your IDE, do global find & replace (⌘+Shift+F in VS Code):

1. IMPORTS:
   Find:    import { useAdaptiveColors } from \"../../constants/Colors\";
   Replace: (delete this line)

   Find:    import { useContextualAdaptiveColors } from \"../../context/ThemeProvider\";  
   Replace: (delete this line)

   Add:     import { useCentralTheme } from \"../../context/CentralTheme\";

2. HOOK USAGE:
   Find:    const colors = useAdaptiveColors();
   Replace: (delete this line)

   Find:    const contextColors = useContextualAdaptiveColors();
   Replace: (delete this line)  

   Add:     const theme = useCurrentTheme() ;

3. COLOR REFERENCES:
   Find:    colors.
   Replace: theme.

   Find:    contextColors.divider
   Replace: theme.divider

   Find:    contextColors.shadowColor  
   Replace: theme.shadowColor

   Find:    contextColors.shadowOpacity
   Replace: theme.shadowOpacity

FILES TO MIGRATE:
================
- app/(auth)/register.tsx
- app/(onboarding)/step1.tsx  
- app/(onboarding)/step2.tsx (partially done)
- app/(auth)/verify.tsx
- Any other files using theme hooks

COMPLETED:
==========
✅ app/(auth)/login.tsx
✅ app/_layout.tsx (status bar)
✅ context/CentralTheme.tsx (created)

BENEFITS AFTER MIGRATION:
========================
✅ Single theme hook instead of 2-3
✅ Automatic status bar theming
✅ Better TypeScript support  
✅ Consistent naming
✅ Better performance
"

echo "Ready to migrate! Use the find & replace patterns above."