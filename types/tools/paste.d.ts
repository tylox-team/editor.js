import { SavedData } from "../data-formats";
import { PasteData } from "../configs/paste-data";
import { PasteEventDetail } from "./paste-events";
import { PasteEvent } from "./paste-events";
import { BlockToolAdapter } from "./adapters/block-tool-adapter";
import { SanitizerConfig } from "../configs";
import { TagSubstitute } from "../configs/paste-data";
import { PatternSubstitute } from "../configs/paste-data";
import { FilesSubstitution } from "../configs/paste-data";

export interface Paste {
  /** If string`s length is greater than this number we don't check paste patterns */
  readonly PATTERN_PROCESSING_MAX_LENGTH: number;

  /** Custom EditorJS mime-type to handle in-editor copy/paste actions */
  readonly MIME_TYPE: string;

  /**
   * Tags` substitutions parameters
   */
  toolsTags: { [tag: string]: TagSubstitute };

  /**
   * Store tags to substitute by tool name
   */
  tagsByTool: { [tools: string]: string[] };

  /** Patterns` substitutions parameters */
  toolsPatterns: PatternSubstitute[];

  /** Files` substitutions parameters */
  toolsFiles: {
    [tool: string]: FilesSubstitution;
  };

  /**
   * List of tools which do not need a paste handling
   */
  exceptionList: string[];

  /**
   * Set onPaste callback and collect tools` paste configurations
   */
  prepare(): Promise<void>;

  /**
   * Set read-only state
   *
   * @param {boolean} readOnlyEnabled - read only flag value
   */
  toggleReadOnly(readOnlyEnabled: boolean): void;

  /**
   * Handle pasted or dropped data transfer object
   *
   * @param {DataTransfer} dataTransfer - pasted or dropped data transfer object
   * @param {boolean} isDragNDrop - true if data transfer comes from drag'n'drop events
   */
  processDataTransfer(
    dataTransfer: DataTransfer,
    isDragNDrop: boolean
  ): Promise<void>;

  /**
   * Process pasted text and divide them into Blocks
   *
   * @param {string} data - text to process. Can be HTML or plain.
   * @param {boolean} isHTML - if passed string is HTML, this parameter should be true
   */
  processText(data: string, isHTML: boolean): Promise<void>;

  /**
   * Set onPaste callback handler
   */
  setCallback(): void;

  /**
   * Unset onPaste callback handler
   */
  unsetCallback(): void;

  /**
   * Get and process tool`s paste configs
   */
  processTools(): void;

  /**
   * Process paste config for each tool
   *
   * @param tool - BlockTool object
   */
  processTool(tool: BlockToolAdapter): void;

  /**
   * Get tags name list from either tag name or sanitization config.
   *
   * @param {string | object} tagOrSanitizeConfig - tag name or sanitize config object.
   * @returns {string[]} array of tags.
   */
  collectTagNames(tagOrSanitizeConfig: string | SanitizerConfig): string[];

  /**
   * Get tags to substitute by Tool
   *
   * @param tool - BlockTool object
   */
  getTagsConfig(tool: BlockToolAdapter): void;

  /**
   * Get files` types and extensions to substitute by Tool
   *
   * @param tool - BlockTool object
   */
  getFilesConfig(tool: BlockToolAdapter): void;

  /**
   * Get RegExp patterns to substitute by Tool
   *
   * @param tool - BlockTool object
   */
  getPatternsConfig(tool: BlockToolAdapter): void;

  /**
   * Check if browser behavior suits better
   *
   * @param {EventTarget} element - element where content has been pasted
   * @returns {boolean}
   */
  isNativeBehaviour(element: EventTarget): boolean;

  /**
   * Check if Editor should process pasted data and pass data transfer object to handler
   *
   * @param {ClipboardEvent} event - clipboard event
   */
  handlePasteEvent(event: ClipboardEvent): Promise<void>;

  /**
   * Get files from data transfer object and insert related Tools
   *
   * @param {FileList} items - pasted or dropped items
   */
  processFiles(items: FileList): Promise<void>;
  /**
   * Get information about file and find Tool to handle it
   *
   * @param {File} file - file to process
   */
  processFile(file: File): Promise<{ event: PasteEvent; type: string }>;

  /**
   * Split HTML string to blocks and return it as array of Block data
   *
   * @param {string} innerHTML - html string to process
   * @returns {PasteData[]}
   */
  processHTML(innerHTML: string): PasteData[];

  /**
   * Split plain text by new line symbols and return it as array of Block data
   *
   * @param {string} plain - string to process
   * @returns {PasteData[]}
   */
  processPlain(plain: string): PasteData[];

  /**
   * Process paste of single Block tool content
   *
   * @param {PasteData} dataToInsert - data of Block to insert
   */
  processSingleBlock(dataToInsert: PasteData): Promise<void>;

  /**
   * Process paste to single Block:
   * 1. Find patterns` matches
   * 2. Insert new block if it is not the same type as current one
   * 3. Just insert text if there is no substitutions
   *
   * @param {PasteData} dataToInsert - data of Block to insert
   */
  processInlinePaste(dataToInsert: PasteData): Promise<void>;

  /**
   * Get patterns` matches
   *
   * @param {string} text - text to process
   * @returns {Promise<{event: PasteEvent, tool: string}>}
   */
  processPattern(text: string): Promise<{ event: PasteEvent; tool: string }>;

  /**
   * Insert pasted Block content to Editor
   *
   * @param {PasteData} data - data to insert
   * @param {boolean} canReplaceCurrentBlock - if true and is current Block is empty, will replace current Block
   * @returns {void}
   */
  insertBlock(data: PasteData, canReplaceCurrentBlock: boolean): void;

  /**
   * Insert data passed as application/x-editor-js JSON
   *
   * @param {Array} blocks — Blocks' data to insert
   * @returns {void}
   */
  insertEditorJSData(blocks: Pick<SavedData, "id" | "data" | "tool">[]): void;

  /**
   * Fetch nodes from Element node
   *
   * @param {Node} node - current node
   * @param {Node[]} nodes - processed nodes
   * @param {Node} destNode - destination node
   */
  processElementNode(node: Node, nodes: Node[], destNode: Node): Node[] | void;
  
  /**
   * Recursively divide HTML string to two types of nodes:
   * 1. Block element
   * 2. Document Fragments contained text and markup tags like a, b, i etc.
   *
   * @param {Node} wrapper - wrapper of paster HTML content
   * @returns {Node[]}
   */
  getNodes(wrapper: Node): Node[];

  /**
   * Compose paste event with passed type and detail
   *
   * @param {string} type - event type
   * @param {PasteEventDetail} detail - event detail
   */
  composePasteEvent(type: string, detail: PasteEventDetail): PasteEvent;
}
