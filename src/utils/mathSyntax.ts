// Utility to convert Obsidian-style math syntax to standard markdown math syntax
// Obsidian: $ for inline, $$ for display blocks  
// Standard: $ for inline, $$ for display blocks (actually they're the same!)

/**
 * Convert Obsidian math syntax to standard markdown math syntax
 * Note: Obsidian and standard markdown actually use the same syntax:
 * - $ for inline math
 * - $$ for display math
 * So this function can be a pass-through, but we keep it for consistency
 * and in case we need to handle any edge cases.
 * @param content - The markdown content with Obsidian math syntax
 * @returns Content with standard markdown math syntax
 */
export function convertObsidianMathSyntax(content: string): string {
  // Since Obsidian and standard markdown use the same math syntax,
  // we can return the content as-is. This function exists for consistency
  // and potential future customizations.
  return content;
}
