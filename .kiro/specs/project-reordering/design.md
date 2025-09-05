# Design Document

## Overview

This design outlines the approach for adding a new project to the `workProjects` array at position 2 (array index 1) in the `src/lib/data/work-projects.ts` file. The implementation involves inserting a new WorkProject object that conforms to the existing interface and data structure, while automatically shifting existing projects down by one position.

## Architecture

### Current Data Structure
The `work-projects.ts` file contains:
- `workProjects`: Main array of WorkProject objects with 4 actual projects + 1 CTA card
- `featuredProjects`: Filtered array excluding CTA cards
- `projectsByCategory`: Object grouping projects by category
- `recentProjects`: Filtered array of actual projects
- `projectStats`: Calculated statistics based on project count

### Target Structure After Insertion
After adding the new project at position 2:
1. Position 1: "Your Clean Queen" (unchanged)
2. Position 2: **New Project** (inserted)
3. Position 3: "Insight Opticians" (shifted from position 2)
4. Position 4: "SaveOnThePen" (shifted from position 3)
5. Position 5: "Plodding Isles" (shifted from position 4)
6. Position 6: CTA Card (unchanged, remains at end)

## Components and Interfaces

### WorkProject Interface Compliance
The new project must implement all required WorkProject properties:

```typescript
interface WorkProject {
  id: string;           // Required: Unique identifier
  title: string;        // Required: Project name
  category: string;     // Required: Project category
  client: string;       // Required: Client name
  duration: string;     // Required: Project duration
  image: string;        // Required: Main project image path
  thumbnail?: string;   // Optional: Thumbnail image path
  description?: string; // Optional: Project description
  link?: string;        // Optional: Live project URL
  tags?: string[];      // Optional: Technology/feature tags
  isCTA?: boolean;      // Optional: CTA card flag (should be false/undefined)
}
```

### ID Management Strategy
- Current IDs: '1', '2', '3', '4', 'cta'
- New project will use ID '2' 
- Existing projects with IDs '2', '3', '4' will be updated to '3', '4', '5' respectively
- This maintains sequential numbering and prevents ID conflicts

### Image Asset Requirements
Following the existing naming convention:
- Main image: `/images/work/[project-name].png`
- Thumbnail: `/images/work/[project-name]-thumb.png` or `.jpg`
- Images should be optimized for web display
- Consistent aspect ratios with existing projects

## Data Models

### New Project Data Structure
The new project will follow this template:

```typescript
{
  id: '2',
  title: '[Project Title]',
  category: '[Project Category]',
  client: '[Client Name]',
  duration: '[Duration]',
  image: '/images/work/[project-name].png',
  thumbnail: '/images/work/[project-name]-thumb.png',
  description: '[Detailed project description]',
  link: '[Live project URL]',
  tags: ['[Technology]', '[Feature]', '[Stack]']
}
```

### ID Reassignment Strategy
Existing projects will have their IDs updated:
- "Insight Opticians": id '2' → '3'
- "SaveOnThePen": id '3' → '4'  
- "Plodding Isles": id '4' → '5'
- CTA card: id 'cta' (unchanged)

### Category Integration
The new project's category will either:
1. Match an existing category in `projectsByCategory`
2. Create a new category entry automatically through the filter logic

## Error Handling

### Data Validation
- Verify all required WorkProject properties are present
- Ensure ID uniqueness after reassignment
- Validate image paths follow naming convention
- Check that category is a non-empty string
- Verify tags array contains valid string values

### Rollback Strategy
If any validation fails:
1. Preserve original array structure
2. Log specific validation errors
3. Provide clear error messages for missing/invalid data
4. Maintain existing functionality without disruption

### Type Safety
- Maintain TypeScript compliance throughout the process
- Ensure all exports remain properly typed
- Verify interface conformance for the new project object

## Testing Strategy

### Data Integrity Tests
1. **Array Length Verification**: Confirm total array length increases by 1
2. **Position Verification**: Verify new project appears at index 1
3. **ID Uniqueness**: Ensure no duplicate IDs exist after insertion
4. **Sequential Ordering**: Confirm projects maintain logical order

### Interface Compliance Tests
1. **Type Checking**: Verify new project conforms to WorkProject interface
2. **Required Properties**: Ensure all mandatory fields are present
3. **Optional Properties**: Validate optional fields are properly typed
4. **Export Functionality**: Test all exported arrays and objects work correctly

### Integration Tests
1. **Featured Projects**: Verify new project appears in featuredProjects array
2. **Category Filtering**: Confirm projectsByCategory includes new project
3. **Statistics Update**: Verify projectStats reflect updated counts
4. **Recent Projects**: Ensure new project appears in recentProjects array

### Visual/UI Tests
1. **Image Loading**: Verify image paths resolve correctly
2. **Data Display**: Confirm all project data renders properly in UI components
3. **Link Functionality**: Test that project links work as expected
4. **Responsive Behavior**: Ensure new project displays correctly across devices

## Implementation Approach

### Step-by-Step Process
1. **Prepare New Project Data**: Create complete WorkProject object with all required properties
2. **Update Existing IDs**: Increment IDs for projects at positions 2, 3, and 4
3. **Insert New Project**: Add new project at array index 1
4. **Verify Data Integrity**: Confirm all arrays and exports function correctly
5. **Update Comments**: Adjust any relevant comments or documentation

### File Modification Strategy
- Make minimal changes to preserve existing structure
- Maintain consistent formatting and indentation
- Preserve all existing comments and documentation
- Keep export structure identical for backward compatibility

### Validation Checkpoints
- Pre-insertion: Verify new project data completeness
- Post-insertion: Confirm array integrity and proper ordering
- Export verification: Test all derived arrays and statistics
- Type checking: Ensure TypeScript compilation succeeds