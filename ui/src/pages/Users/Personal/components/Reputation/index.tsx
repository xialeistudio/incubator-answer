/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import { FC, memo } from 'react';
import { ListGroup, ListGroupItem } from 'react-bootstrap';

import { FormatTime } from '@/components';
import { pathFactory } from '@/router/pathFactory';

interface Props {
  visible: boolean;
  data;
}

const Index: FC<Props> = ({ visible, data }) => {
  if (!visible || !data?.length) {
    return null;
  }
  return (
    <ListGroup className="rounded-0">
      {data.map((item) => {
        return (
          <ListGroupItem
            className="d-flex py-3 px-0 bg-transparent border-start-0 border-end-0"
            key={item.object_id}>
            <div
              className={`me-3 text-end ${
                item.reputation > 0 ? 'text-success' : 'text-danger'
              }`}
              style={{ width: '40px', minWidth: '40px' }}>
              {item.reputation > 0 ? '+' : ''}
              {item.reputation}
            </div>
            <div>
              <a
                className="text-break"
                href={
                  item.object_type === 'question'
                    ? pathFactory.questionLanding(
                        item.question_id,
                        item.url_title,
                      )
                    : pathFactory.answerLanding({
                        questionId: item.question_id,
                        slugTitle: item.url_title,
                        answerId: item.answer_id,
                      })
                }>
                {item.title}
              </a>
              <div className="d-flex align-items-center small text-secondary">
                <span>{item.rank_type}</span>
                <span className="split-dot" />
                <FormatTime time={item.created_at} className="me-4" />
              </div>
            </div>
          </ListGroupItem>
        );
      })}
    </ListGroup>
  );
};

export default memo(Index);
