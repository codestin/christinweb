#!/usr/bin/env python3
"""
Script to retag all notes in the _notes/ directory according to the new tagging structure:
- Primary categories: healthcare, creative, meditation (at least one required)
- Content type: essays or notes
- Additional tags: pluralized, where 3+ notes exist
"""

import os
import re
from pathlib import Path
from typing import List, Set, Dict

# Base directory
NOTES_DIR = Path("/Users/c/CODING/CHRISTINWEB/_notes")

# Explicit list of essays (based on published essays shown in screenshot)
ESSAY_FILENAMES = {
    'editing-sucks-what-2.md',
    'spiritual-practice-online.md',
    'buddhas-doesnt.md',
    'gladhill-rhone.md',
    'buddhist-chaplain.md',
    'self-improvement-treadmill.md',
    '2018-violet.md',
    're-learning-childhood.md',
    'loving-kindness-overcome.md',
    'reverse-engineered-outwitting.md',
    'information-megaphone.md',
    'susceptability-type.md',
}

# Keyword mappings for primary categories
HEALTHCARE_KEYWORDS = {
    'healthcare', 'health', 'medical', 'biotech', 'patient', 'hospital', 'doctor', 'nurse',
    'chaplaincy', 'chaplain', 'wellness', 'fitness', 'nutrition', 'exercise', 'massage',
    'neuroscience', 'anxiety', 'mental health', 'running', 'powerlifting', 'aging', 'dying',
    'sick', 'illness', 'covid', 'medicine', 'alternative-healthcare', 'care'
}

CREATIVE_KEYWORDS = {
    'creative', 'creativity', 'art', 'drawing', 'music', 'singing', 'piano', 'writing',
    'storytelling', 'fiction', 'marketing', 'copywriting', 'business', 'entrepreneur',
    'web3', 'farcaster', 'crypto', 'nft', 'tech', 'technology', 'software', 'productivity',
    'tools', 'social media', 'twitter', 'content', 'design', 'games', 'podcast',
    'performance', 'comedy', 'editing', 'publishing', 'newsletter', 'projects'
}

MEDITATION_KEYWORDS = {
    'meditation', 'mindfulness', 'buddhism', 'buddhist', 'dharma', 'spirituality',
    'spiritual', 'practice', 'breathing', 'metta', 'loving-kindness', 'compassion',
    'kindness', 'mindful', 'awareness', 'contemplative', 'eightfold', 'enlightened',
    'zen', 'vipassana', 'insight', 'calm', 'peace', 'interfaith', 'tarot'
}

# Additional tag mappings (pluralized)
ADDITIONAL_TAG_MAPPINGS = {
    'newsletters': {'newsletter', 'substack', 'behind', 'scenes', 'sunday'},
    'courses': {'course', 'cohort', 'teaching', 'workshop', 'bootcamp'},
    'relationships': {'relationship', 'communication', 'friendship', 'friends', 'relating', 'listening'},
    'writings': {'writing', 'write', 'writer', 'editing', 'editor', 'publishing'},
    'buddhist-teachings': {'buddhism', 'dharma', 'buddha', 'buddhist', 'eightfold', 'metta'},
    'marketing': {'marketing', 'seo', 'copywriting', 'advertising', 'sales'},
    'tools': {'productivity', 'note-taking', 'notion', 'roam', 'obsidian', 'tools', 'software'},
    'web3': {'web3', 'farcaster', 'crypto', 'nft', 'blockchain'},
    'resources': {'resource', 'link', 'collection', 'compilation', 'references'},
    'personal-growth': {'growth', 'self-improvement', 'self-care', 'development', 'personal'},
    'words': {'word-of-year', 'cozygoober', 'artist', 'word of the year'},
}

# Files that should have the asian-americans tag (explicitly about Asian-American topics)
ASIAN_AMERICAN_FILES = {
    'diversity-class.md',  # Race and identity discussions
    'xenophobic-harassment.md',  # Anti-Asian harassment workshop
    'self-improvement-treadmill.md',  # Bao Yang (Asian cultural practice)
}


def extract_front_matter(content: str) -> tuple:
    """Extract YAML front matter and body from markdown content."""
    match = re.match(r'^---\n(.*?)\n---\n(.*)$', content, re.DOTALL)
    if match:
        return match.group(1), match.group(2)
    return "", content


def parse_yaml_simple(yaml_text: str) -> dict:
    """Simple YAML parser for front matter."""
    data = {}
    for line in yaml_text.split('\n'):
        if ':' in line:
            key, value = line.split(':', 1)
            key = key.strip()
            value = value.strip()

            # Handle lists
            if value.startswith('[') and value.endswith(']'):
                # Remove brackets and split by comma
                items = value[1:-1].split(',')
                data[key] = [item.strip().strip('"').strip("'") for item in items]
            else:
                # Remove quotes if present
                value = value.strip('"').strip("'")
                data[key] = value
    return data


def write_front_matter(data: dict) -> str:
    """Convert dict back to YAML front matter."""
    lines = ['---']
    for key, value in data.items():
        if key == 'tags' and isinstance(value, list):
            # Format tags as YAML list
            tags_str = '[' + ', '.join(value) + ']'
            lines.append(f'{key}: {tags_str}')
        elif isinstance(value, str) and key not in ['date', 'layout']:
            # Quote title and other strings, but not date/layout which have specific formats
            # Check if value needs quoting (contains special YAML characters)
            if ':' in value or '#' in value or value.startswith('{') or value.startswith('['):
                escaped_value = value.replace('\\', '\\\\').replace('"', '\\"')
                lines.append(f'{key}: "{escaped_value}"')
            else:
                lines.append(f'{key}: {value}')
        else:
            lines.append(f'{key}: {value}')
    lines.append('---')
    return '\n'.join(lines)


def count_words(text: str) -> int:
    """Count words in text, excluding front matter."""
    # Remove markdown headers, links, code blocks
    text = re.sub(r'#+ ', '', text)
    text = re.sub(r'\[([^\]]+)\]\([^\)]+\)', r'\1', text)
    text = re.sub(r'```[^`]*```', '', text, flags=re.DOTALL)
    text = re.sub(r'`[^`]+`', '', text)
    return len(text.split())


def determine_primary_categories(title: str, body: str, old_tags: List[str]) -> Set[str]:
    """Determine which primary categories (healthcare, creative, meditation) apply."""
    categories = set()

    # Combine title, body, and old tags for analysis
    text_to_analyze = f"{title} {body} {' '.join(old_tags)}".lower()

    # Check for healthcare keywords
    if any(keyword in text_to_analyze for keyword in HEALTHCARE_KEYWORDS):
        categories.add('healthcare')

    # Check for creative keywords
    if any(keyword in text_to_analyze for keyword in CREATIVE_KEYWORDS):
        categories.add('creative')

    # Check for meditation keywords
    if any(keyword in text_to_analyze for keyword in MEDITATION_KEYWORDS):
        categories.add('meditation')

    # If no category found, default based on most common old tags
    if not categories:
        # Default heuristics
        if any(tag in old_tags for tag in ['spirituality', 'buddhism', 'mindfulness']):
            categories.add('meditation')
        if any(tag in old_tags for tag in ['writing', 'courses', 'business', 'tech']):
            categories.add('creative')
        if any(tag in old_tags for tag in ['health', 'wellness']):
            categories.add('healthcare')

    # Still no category? Default to creative (broadest category)
    if not categories:
        categories.add('creative')

    return categories


def determine_additional_tags(title: str, body: str, old_tags: List[str]) -> Set[str]:
    """Determine additional tags based on content and old tags."""
    additional_tags = set()

    # Combine for analysis
    text_to_analyze = f"{title} {body} {' '.join(old_tags)}".lower()

    # Check each additional tag category
    for tag, keywords in ADDITIONAL_TAG_MAPPINGS.items():
        if any(keyword in text_to_analyze for keyword in keywords):
            additional_tags.add(tag)

    return additional_tags


def process_note(file_path: Path) -> None:
    """Process a single note file and update its tags."""
    print(f"Processing: {file_path.name}")

    # Read file
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Extract front matter and body
    front_matter_text, body = extract_front_matter(content)
    if not front_matter_text:
        print(f"  ⚠ No front matter found, skipping")
        return

    # Parse front matter
    front_matter = parse_yaml_simple(front_matter_text)

    # Get title and old tags
    title = front_matter.get('title', '')
    old_tags = front_matter.get('tags', [])
    if isinstance(old_tags, str):
        old_tags = [old_tags]

    # Determine content type based on explicit essay list
    content_type = 'essays' if file_path.name in ESSAY_FILENAMES else 'notes'

    # Determine primary categories
    primary_categories = determine_primary_categories(title, body, old_tags)

    # Determine additional tags
    additional_tags = determine_additional_tags(title, body, old_tags)

    # Add asian-americans tag for specific files
    if file_path.name in ASIAN_AMERICAN_FILES:
        additional_tags.add('asian-americans')

    # Combine all tags
    new_tags = list(primary_categories) + [content_type] + sorted(additional_tags)

    # Update front matter
    front_matter['tags'] = new_tags

    # Write back
    new_content = write_front_matter(front_matter) + '\n' + body

    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(new_content)

    print(f"  ✓ Updated: {old_tags} → {new_tags}")
    print(f"    Type: {content_type}")


def main():
    """Process all notes in the _notes directory."""
    print("Starting note retagging process...\n")

    # Get all markdown files
    md_files = list(NOTES_DIR.rglob('*.md'))
    print(f"Found {len(md_files)} markdown files\n")

    # Process each file
    for file_path in md_files:
        try:
            process_note(file_path)
        except Exception as e:
            print(f"  ✗ Error processing {file_path.name}: {e}")

    print(f"\n✓ Completed processing {len(md_files)} files")


if __name__ == '__main__':
    main()
