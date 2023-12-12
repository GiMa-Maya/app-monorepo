import { forwardRef } from 'react';
import type { ForwardedRef } from 'react';

import { usePropsAndStyle, useStyle } from '@tamagui/core';
import DraggableFlatList, {
  OpacityDecorator,
  ScaleDecorator,
  ShadowDecorator,
} from 'react-native-draggable-flatlist';
import { withStaticProperties } from 'tamagui';

import type { StackStyleProps } from '@tamagui/web/types/types';
import type { StyleProp, ViewStyle } from 'react-native';
import type { DraggableFlatListProps } from 'react-native-draggable-flatlist';
import type { FlatList } from 'react-native-gesture-handler';

export type ISortableListViewRef<T> = FlatList<T>;

export type ISortableListViewProps<T> = Omit<
  DraggableFlatListProps<T>,
  | 'data'
  | 'renderItem'
  | 'keyExtractor'
  | 'getItemLayout'
  | 'containerStyle'
  | 'contentContainerStyle'
  | 'columnWrapperStyle'
  | 'ListHeaderComponentStyle'
  | 'ListFooterComponentStyle'
> &
  StackStyleProps & {
    data: T[];
    keyExtractor: (item: T, index: number) => string;
    renderItem: (info: {
      item: T;
      getIndex: () => number | undefined;
      drag: () => void;
      isActive: boolean;
    }) => JSX.Element;
    getItemLayout: (
      data: ArrayLike<T> | undefined | null,
      index: number,
    ) => { length: number; offset: number; index: number };

    containerStyle?: StackStyleProps;
    contentContainerStyle?: StackStyleProps;
    columnWrapperStyle?: StackStyleProps;
    ListHeaderComponentStyle?: StackStyleProps;
    ListFooterComponentStyle?: StackStyleProps;
  };

function BaseSortableListView<T>(
  {
    data,
    keyExtractor,
    renderItem,
    containerStyle = {},
    contentContainerStyle = {},
    columnWrapperStyle,
    ListHeaderComponentStyle = {},
    ListFooterComponentStyle = {},
    ...props
  }: ISortableListViewProps<T>,
  ref: ForwardedRef<ISortableListViewRef<T>> | undefined,
) {
  const [restProps, style] = usePropsAndStyle(props, {
    resolveValues: 'auto',
  });
  const rawContainerStyle = useStyle(
    containerStyle as Record<string, unknown>,
    {
      resolveValues: 'auto',
    },
  );
  const rawContentContainerStyle = useStyle(
    contentContainerStyle as Record<string, unknown>,
    {
      resolveValues: 'auto',
    },
  );

  const columnStyle = useStyle(
    (columnWrapperStyle || {}) as Record<string, unknown>,
    {
      resolveValues: 'auto',
    },
  );

  const listHeaderStyle = useStyle(
    ListHeaderComponentStyle as Record<string, unknown>,
    {
      resolveValues: 'auto',
    },
  );

  const listFooterStyle = useStyle(
    ListFooterComponentStyle as Record<string, unknown>,
    {
      resolveValues: 'auto',
    },
  );
  return (
    <DraggableFlatList<T>
      ref={ref}
      style={style as StyleProp<ViewStyle>}
      containerStyle={[{ flex: 1 }, rawContainerStyle]}
      columnWrapperStyle={columnWrapperStyle ? columnStyle : undefined}
      ListHeaderComponentStyle={listHeaderStyle}
      ListFooterComponentStyle={listFooterStyle}
      contentContainerStyle={rawContentContainerStyle}
      data={data}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
      {...restProps}
    />
  );
}

export const SortableListView = withStaticProperties(
  forwardRef(BaseSortableListView) as typeof BaseSortableListView,
  {
    OpacityDecorator,
    ScaleDecorator,
    ShadowDecorator,
  },
);
